import {ability} from '@saas/auth'


const userCanInveteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')
const userCannotDeleteOtherUsers = ability.cannot('delete', 'User')
console.log(userCannotDeleteOtherUsers) 