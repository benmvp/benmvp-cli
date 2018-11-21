import {CREATE_ARGS, CREATE_POS_ARGS} from '../cli/args'

export default async ({
  formats = CREATE_ARGS.formats.default,
  out = CREATE_ARGS.out.default,
  modes = CREATE_ARGS.modes.default,
  name = CREATE_POS_ARGS.name.default,
} = {}): Promise<any> => {
  console.log('run create', {formats, out, modes, name})
}
