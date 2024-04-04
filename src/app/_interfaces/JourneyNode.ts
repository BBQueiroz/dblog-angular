
export interface JourneyNode{
    id: string;
    user: string;
    root: JourneyNode;
    text: string;
    children: JourneyNode[];
    parent: JourneyNode;
    histPost: Date[];

}