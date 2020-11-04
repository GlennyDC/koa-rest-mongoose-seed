import glob from 'glob';

const getMatchingFileNamesInDir = async (
  absoluteDirPath: string,
  globPattern: string,
): Promise<string[]> =>
  new Promise((resolve, reject) => {
    glob(
      globPattern,
      { cwd: absoluteDirPath, nosort: true, absolute: true },
      (err, matches) => {
        if (err) {
          return reject(err);
        }
        return resolve(matches);
      },
    );
  });

type ModuleWithDefaultExport = { default: any };

const importModules = async (
  absoluteFilePaths: string[],
): Promise<ModuleWithDefaultExport[]> =>
  Promise.all(
    absoluteFilePaths.map(async (absoluteFilePath) => import(absoluteFilePath)),
  );

export const getDefaultExportsFromModules = async <T>(
  absoluteDirPath: string,
  globPattern: string,
): Promise<T[]> => {
  const fileNames = await getMatchingFileNamesInDir(
    absoluteDirPath,
    globPattern,
  );

  const modules = await importModules(fileNames);

  return modules.map((module) => module.default);
};
