import * as fs from 'fs';

export const writeLog = (path: string, msg: string): void => {
  fs.writeFile(path, `${msg}\r\n`, { flag: "a+"}, (err) => {
    if(err) throw err;
  })
}

export const overWriteLog = (path: string, msg: string): void => {
  fs.writeFile(path, msg, (err) => {
    if(err) throw err;
  })
}

export const readLog = (path: string): string => {
  return fs.readFileSync(path).toString();
}

export const existLog = (path: string): boolean => {
  return fs.existsSync(path);
}