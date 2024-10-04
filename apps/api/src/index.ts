import {defineAbilityFor} from '@saas/auth'


const ability = defineAbilityFor({role: 'ADMIN',})

const userCanInveteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')
const userCannotDeleteOtherUsers = ability.cannot('delete', 'User')
console.log(userCannotDeleteOtherUsers) 