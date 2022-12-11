import {Command, Flags, CliUx} from '@oclif/core'
import * as EndpointV1 from '../../endpoints/v1/index.js'
import YAML from 'yaml'
import fs from 'fs-extra'
import lodash from 'lodash'

export default class Login extends Command {
  static description = 'Log in markji.'

  static examples = [
    `$ <%= config.bin %> <%= command.id %>
profile: [profile]
username: [username]
password: [password]
Logged by [username] ([profile])!`,
    `$ <%= config.bin %> <%= command.id %> --profile default
username: [username]
password: [password]
Logged by [username] (default)!`,
    `$ <%= config.bin %> <%= command.id %> --profile default --username oscaner
password: [password]
Logged by oscaner (default)!`,
  ]

  static flags = {
    profile: Flags.string({char: 'p'}),
    username: Flags.string({char: 'u'}),
    password: Flags.string(),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Login)

    if (!flags.profile) {
      flags.profile = await CliUx.ux.prompt('Your profile name', {default: 'default'})
    }

    if (!flags.username) {
      flags.username = await CliUx.ux.prompt('Username')
    }

    if (!flags.password) {
      flags.password = await CliUx.ux.prompt('Password', {type: 'hide'})
    }

    const response = await EndpointV1.Users.login(flags.username, flags.password)

    if (response.success) {
      const credentials: object = YAML.parse(fs.readFileSync('~/.config/maimemo/credentials', 'utf8'))
      lodash.set(credentials, `markji.${flags.profile}.token`, response.data.token)
      fs.writeFileSync('~/.config/maimemo/credentials', YAML.stringify(credentials))
    }
    else {
      response.errors.forEach(
        ele => this.error(ele.message)
      )
    }

    if (this.jsonEnabled()) {

    }
    console.log(response)

    this.log(`Logged by ${flags.profile}`)
  }
}
