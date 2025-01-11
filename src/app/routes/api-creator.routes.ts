import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';

const router = Router();

const TEMPLATES_DIR = path.resolve(__dirname, '../../common/hbs');
const MODULES_DIR = path.resolve(__dirname, '../modules');
const ROUTES_DIR = path.resolve(__dirname, '../routes');

const generateFileFromTemplate = async (templateName: string, outputPath: string, context: any) => {
  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.hbs`);
  const template = await fs.readFile(templatePath, 'utf-8');
  const compiledTemplate = Handlebars.compile(template);
  const content = compiledTemplate(context);
  await fs.outputFile(outputPath, content);
};

router.post('/', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    res.status(403).json({ error: 'This endpoint is only available in development.' });
    return;
  }

  const { name, module, dbModel, files, fields } = req.body;

  if (!name || !module || !dbModel || !files || !fields) {
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!module) missingFields.push('module');
    if (!dbModel) missingFields.push('dbModel');
    if (!files) missingFields.push('files');
    if (!fields) missingFields.push('fields');
    res.status(400).json({ message: "Invalid payload", error: `${missingFields.join(', ')} is missing` });
    return;
  }

  const modulePath = path.join(MODULES_DIR, module.toLowerCase());

  try {
    await fs.ensureDir(modulePath);

    const tasks = files.map((file: string) => {
      switch (file) {
        case 'route':
          return generateFileFromTemplate(
            'route',
            path.join(ROUTES_DIR, `${name.toLowerCase()}.routes.ts`),
            {
              module: name,
              moduleMain: module,
              import: name.toLowerCase(),
              name,
              services: [`get${name}s`, `getOne${name}`, `register${name}`],
            }
          );
        case 'model':
          return generateFileFromTemplate(
            'model',
            path.join(modulePath, 'models', `${name.toLowerCase()}.ts`),
            {
              module: name,
              fields,
            }
          );
        case 'repository':
          return generateFileFromTemplate(
            'repository',
            path.join(modulePath, 'repositories', `${name.toLowerCase()}.repository.ts`),
            {
              module: name,
              import: name.toLowerCase(),
              dbModel,
            }
          );
        case 'service':
          return generateFileFromTemplate(
            'service',
            path.join(modulePath, 'services', `${name.toLowerCase()}.service.ts`),
            {
              module: name,
              import: name.toLowerCase(),
            }
          );
        case 'validator':
          return generateFileFromTemplate(
            'validator',
            path.join(modulePath, 'validator', `${name.toLowerCase()}.validator.ts`),
            {
              module: name,
              import: name.toLowerCase(),
              fields,
            }
          );
        default:
          return Promise.resolve();
      }
    });

    await Promise.all(tasks);

    res.status(201).json({ message: `Module '${name}' created successfully under '${name}'` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating module.' });
  }
});

export default router;
