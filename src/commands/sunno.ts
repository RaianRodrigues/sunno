import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'sunno',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info('Welcome to sunno CLI')
  },
}

module.exports = command