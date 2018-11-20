import {BUILD_ARGS} from '../cli/args'

export default async ({
  formats = BUILD_ARGS.formats.default,
  out = BUILD_ARGS.out.default,
  watch = BUILD_ARGS.watch.default,
}): Promise<any> => {
  // npx babel src --out-dir lib/umd --extensions ".ts"
  console.log('run build', {formats, out, watch})
}
