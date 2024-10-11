export interface LearnMenuTopicsQueryResponse {
    data: Data;
}

export interface Data {
    learnMenuTopics: LearnMenuTopic[];
}

export interface LearnMenuTopic {
    __typename:      LearnMenuTopicTypename;
    children:        Child[];
    href:            string;
    icon:            string;
    isNew:           boolean;
    slug:            string;
    translatedTitle: string;
}

export enum LearnMenuTopicTypename {
    TopicBrowserCategory = "TopicBrowserCategory",
}

export interface Child {
    __typename:      ChildTypename;
    href:            string;
    isNew:           boolean;
    loggedOutHref:   null | string;
    nonContentLink:  boolean;
    slug:            string;
    translatedTitle: string;
}

export enum ChildTypename {
    TopicBrowserLink = "TopicBrowserLink",
}
