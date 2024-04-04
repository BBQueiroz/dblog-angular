
export interface Posts{
    id: string;
    user: string;
    title: string;
    content: Text;
    histPost: Date[];
    parent: Posts;

}