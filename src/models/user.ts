import TUser from "../@types/TUser";

export default class User {
	readonly id?: number
	name?: string
	email?: string
    password: string | undefined

	constructor(props: TUser){
		this.name = props.name
		this.email = props.email
		this.password = props.password
	}
}