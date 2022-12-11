import { Command, Help } from '@oclif/core'

export default class Index extends Command {
  static hidden = true

  static summary = 'Manage markji assets interactively.'

  static usage = '<%= command.id %> [SUB_COMMAND]'

  async run(): Promise<void> {
    const help = new Help(this.config, this.config.pjson.helpOptions)
    await help.showHelp(['markji'])
  }
}
