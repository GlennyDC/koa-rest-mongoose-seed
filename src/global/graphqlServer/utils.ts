import glob from 'glob';
import path from 'path';

const TYPEDEFS_GLOB_PATTERN = '**/*.typeDefs!(*.map)';

const getMatchingFileNamesInDir = async (
  dirPath: string,
  globPattern: string,
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob(globPattern, { cwd: dirPath, nosort: true }, (err, matches) => {
      if (err) {
        return reject(err);
      }
      return resolve(matches);
    });
  });
};

const readFiles = async (files: string[]): Promise<string[]> => {
  const typeDefs = [];
  for (const file of files) {
    const module = await import(file);
    typeDefs.push(module.default);
  }
  return typeDefs;
};

export const bootstrapSchema = async (): Promise<string[]> => {
  const files = await getMatchingFileNamesInDir(
    path.join(__dirname, '../../modules'),
    TYPEDEFS_GLOB_PATTERN,
  );
  console.log(files);
  return await readFiles(files);
};
