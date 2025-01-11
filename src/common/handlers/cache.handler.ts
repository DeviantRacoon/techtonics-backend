import fs from "fs";
import path from "path";

/**
 * Representa una entrada de caché.
 */
export type CacheEntry<T> = {
  value: T;
  expiresAt?: number; // Tiempo de expiración en milisegundos (opcional)
};

/**
 * Administrador de caché con soporte para TTL, límite de tamaño y persistencia en disco.
 */
export default class CacheManager<T> {
  private static globalCache: Map<string, CacheEntry<any>> = new Map();
  private cache: Map<string, CacheEntry<T>>;
  private ttl: number; // Tiempo de vida (en milisegundos) de las entradas de caché
  private maxSize: number; // Tamaño máximo del caché
  private cacheDir: string | null; // Directorio para persistencia de caché

  /**
   * Crea una instancia del `CacheManager`.
   * @param options Configuración del caché.
   * @param options.ttl Tiempo de vida (en milisegundos) para las entradas. Por defecto, 60 segundos.
   * @param options.maxSize Máximo número de entradas en el caché. Por defecto, 100.
   * @param options.scope Define el alcance del caché (`"local"` o `"global"`). Por defecto, `"local"`.
   * @param options.persistDir Directorio donde se guardará el caché de forma persistente. Si no se define, no se guarda en disco.
   */
  constructor(
    options: {
      ttl?: number;
      maxSize?: number;
      scope?: "local" | "global";
      persistDir?: string;
    } = {}
  ) {
    this.ttl = options.ttl ?? 60000; // TTL por defecto: 60 segundos
    this.maxSize = options.maxSize ?? 100; // Máximo tamaño por defecto: 100 entradas
    this.cache =
      options.scope === "local"
        ? new Map<string, CacheEntry<T>>()
        : (CacheManager.globalCache as Map<string, CacheEntry<T>>);
    this.cacheDir = options.persistDir ?? path.join(process.cwd(), ".cache");

    // Si hay un directorio de persistencia, crea la estructura necesaria
    if (this.cacheDir) {
      this.ensureCacheDir();
      this.loadCache();
    }
  }

  /**
   * Guarda un valor en el caché.
   * @param key Clave para identificar la entrada.
   * @param value Valor a guardar en el caché.
   */
  set(key: string, value: T): void {
    const expiresAt = Date.now() + this.ttl;

    if (this.cache.size >= this.maxSize) {
      this.evict(); // Elimina el elemento más antiguo si se excede el tamaño
    }

    this.cache.set(key, { value, expiresAt });

    // Persiste la entrada si se habilitó la persistencia
    if (this.cacheDir) {
      this.saveCacheEntry(key, { value, expiresAt });
    }
  }

  /**
   * Obtiene un valor del caché.
   * @param key Clave de la entrada a recuperar.
   * @returns El valor almacenado o `undefined` si no existe o expiró.
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) return undefined;

    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      if (this.cacheDir) {
        this.deleteCacheEntry(key); // Elimina del disco si expiró
      }
      return undefined;
    }

    return entry.value;
  }

  /**
   * Verifica si una clave existe en el caché.
   * @param key Clave a verificar.
   * @returns `true` si la clave existe, `false` en caso contrario.
   */
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Elimina una entrada del caché.
   * @param key Clave de la entrada a eliminar.
   */
  delete(key: string): void {
    this.cache.delete(key);
    if (this.cacheDir) {
      this.deleteCacheEntry(key);
    }
  }

  /**
   * Elimina todas las entradas del caché.
   */
  clear(): void {
    this.cache.clear();
    if (this.cacheDir) {
      fs.rmSync(this.cacheDir, { recursive: true, force: true });
      this.ensureCacheDir(); // Recrea el directorio después de limpiar
    }
  }

  /**
   * Devuelve el tamaño actual del caché.
   * @returns Número de entradas en el caché.
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Elimina la entrada más antigua del caché.
   */
  private evict(): void {
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.delete(firstKey);
    }
  }

  /**
   * Asegura que el directorio de caché existe.
   */
  private ensureCacheDir(): void {
    if (this.cacheDir && !fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  /**
   * Guarda una entrada específica en un archivo.
   * @param key Clave de la entrada.
   * @param entry Entrada a guardar.
   */
  private saveCacheEntry(key: string, entry: CacheEntry<T>): void {
    const filePath = path.join(this.cacheDir!, encodeURIComponent(key));
    fs.writeFileSync(filePath, JSON.stringify(entry), "utf-8");
  }

  /**
   * Elimina un archivo de caché correspondiente a una clave.
   * @param key Clave de la entrada a eliminar.
   */
  private deleteCacheEntry(key: string): void {
    const filePath = path.join(this.cacheDir!, encodeURIComponent(key));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  /**
   * Carga el caché persistente desde los archivos del directorio.
   */
  private loadCache(): void {
    if (!this.cacheDir || !fs.existsSync(this.cacheDir)) return;

    const files = fs.readdirSync(this.cacheDir);

    for (const file of files) {
      const filePath = path.join(this.cacheDir, file);
      try {
        const data = fs.readFileSync(filePath, "utf-8");
        const entry: CacheEntry<T> = JSON.parse(data);

        if (!entry.expiresAt || entry.expiresAt > Date.now()) {
          this.cache.set(decodeURIComponent(file), entry);
        } else {
          fs.unlinkSync(filePath); // Elimina archivos expirados
        }
      } catch (err) {
        console.error(`Error al cargar la entrada de caché ${file}:`, err);
      }
    }
  }
}
