import { User } from "./User";

export interface Posts{
    id: string;
    user: string;
    title: string;
    content: Text;
    histPost: Date[];
    parent: Posts;
    qtd_likes: number;
    likes_list: User[];
}