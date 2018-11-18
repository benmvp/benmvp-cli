import {CREATE_ARGS} from '../cli/args'

export default async ({
  formats = CREATE_ARGS.formats.default,
  out: outputPath = CREATE_ARGS.out.default,
  modes = CREATE_ARGS.modes.default,
}): Promise<any> => {
  console.log('run create', {formats, outputPath, modes})
}
