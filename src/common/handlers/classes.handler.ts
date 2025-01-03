export function AutoAccessor(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const privateKey = `_${String(propertyKey)}`;
    const capitalizedKey = capitalize(String(propertyKey));

    Object.defineProperty(target, privateKey, {
      writable: true,
      enumerable: false,
      configurable: true,
    });

    const getterName = `get${capitalizedKey}`;
    const setterName = `set${capitalizedKey}`;

    if (!Object.prototype.hasOwnProperty.call(target, getterName)) {
      Object.defineProperty(target, getterName, {
        value: function () {
          return this[privateKey];
        },
        enumerable: false,
        configurable: true,
      });
    }

    if (!Object.prototype.hasOwnProperty.call(target, setterName)) {
      Object.defineProperty(target, setterName, {
        value: function (value: any) {
          this[privateKey] = value;
        },
        enumerable: false,
        configurable: true,
      });
    }
  };
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export class BaseModel {
  assign<T extends Partial<this>>(data: T): this {
    Object.assign(this, data);
    return this;
  }

  static create<T extends BaseModel, U extends Partial<T>>(this: new () => T, data: U): T {
    const instance = new this();
    return instance.assign(data);
  }

  toJSON(): { [key: string]: any } {
    const jsonObject: { [key: string]: any } = {};

    Object.keys(this).forEach((key) => {
      const value = (this as any)[key];
      if (value !== undefined) {
        jsonObject[key] = value;
      }
    });

    return jsonObject;
  }
}
