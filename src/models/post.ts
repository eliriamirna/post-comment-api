import TPost from "../@types/TPost";

export default class User {
	readonly id?: number
	user_id?: number
	title?: string
	description?: string
	file_name?: string;
    file_path?: string;

	constructor(props: TPost){
		this.user_id = props.user_id
		this.title = props.title
		this.description = props.description
		this.file_name = props.file_name
		this.file_path = props.file_path
	}
}