export interface ContentForPathResponse {
    data: Data;
}

export interface Data {
    contentRoute:            ContentRoute;
    publishedContentVersion: PublishedContentVersion;
}

export interface ContentRoute {
    __typename:       string;
    listedPathData:   ListedPathData;
    resolvedPath:     string;
    unlistedPathData: null;
}

export interface ListedPathData {
    __typename: string;
    content:    null;
    course:     Course;
    lesson:     null;
}

export interface Course {
    __typename:               string;
    contentKind:              string;
    courseChallenge:          Challenge;
    curation:                 Curation;
    iconPath:                 string;
    id:                       string;
    isListedForLearners:      boolean;
    lowerToc:                 boolean;
    masterableExercises:      MasterableExercise[];
    masteryChallenge:         Challenge;
    masteryEnabled:           boolean;
    parent:                   CourseParent;
    relativeUrl:              string;
    slug:                     string;
    translatedCustomTitleTag: string;
    translatedDescription:    string;
    translatedTitle:          string;
    unitChildren:             UnitChild[];
    userAuthoredContentTypes: any[];
}

export interface Challenge {
    __typename:            string;
    contentDescriptor:     string;
    contentKind:           string;
    exerciseLength:        number;
    id:                    string;
    parentTopic:           ParentTopic;
    slug:                  string;
    timeEstimate:          TimeEstimate;
    urlWithinCurationNode: string;
}

export interface ParentTopic {
    __typename: ParentTopicTypename;
    id:         string;
    parent:     ParentTopicParent;
}

export enum ParentTopicTypename {
    Topic = "Topic",
}

export interface ParentTopicParent {
    __typename:     ParentTopicTypename;
    id:             string;
    masteryEnabled: boolean;
}

export interface TimeEstimate {
    __typename: TimeEstimateTypename;
    lowerBound: number;
    upperBound: number;
}

export enum TimeEstimateTypename {
    TimeEstimate = "TimeEstimate",
}

export interface Curation {
    __typename:               string;
    excludedChildren:         any[];
    hideCommunityQuestions:   boolean;
    hideSubjectIntro:         boolean;
    modules:                  Module[];
    sponsorFooterAttribution: SponsorFooterAttribution;
}

export interface Module {
    __typename:         string;
    callToAction:       string;
    description:        string;
    kind:               string;
    link:               string;
    title:              string;
    untranslatedFields: any[];
    video:              string;
}

export interface SponsorFooterAttribution {
    __typename:           string;
    footnoteHtml:         string;
    imageBaselineAligned: null;
    imageCaption:         null;
    imageUrl:             null;
    taglineHtml:          null;
}

export interface MasterableExercise {
    __typename: MasterableExerciseTypename;
    id:         string;
}

export enum MasterableExerciseTypename {
    Article = "Article",
    Exercise = "Exercise",
    Lesson = "Lesson",
    TopicQuiz = "TopicQuiz",
    TopicUnitTest = "TopicUnitTest",
    Video = "Video",
}

export interface CourseParent {
    __typename:      ParentTopicTypename;
    contentKind:     string;
    id:              string;
    relativeUrl:     string;
    slug:            string;
    translatedTitle: string;
}

export interface UnitChild {
    __typename:               UnitChildTypename;
    allOrderedChildren:       EdChild[];
    iconPath:                 string;
    id:                       string;
    isListedForLearners:      boolean;
    masteryEnabled:           boolean;
    relativeUrl:              string;
    slug:                     string;
    translatedCustomTitleTag: string;
    translatedDescription:    string;
    translatedTitle:          string;
    unlistedAncestorIds:      null;
}

export enum UnitChildTypename {
    Unit = "Unit",
}

export interface EdChild {
    __typename:                MasterableExerciseTypename;
    curatedChildren?:          EdChild[];
    id:                        string;
    key?:                      string;
    relativeUrl?:              string;
    slug:                      string;
    translatedDescription:     string;
    translatedTitle:           string;
    canonicalUrl?:             string;
    contentDescriptor?:        string;
    contentKind?:              ContentKind;
    exerciseLength?:           number;
    index?:                    number;
    parentTopic?:              ParentTopic;
    progressKey?:              string;
    timeEstimate?:             TimeEstimate;
    translatedCustomTitleTag?: string;
    urlWithinCurationNode?:    string;
    isSkillCheck?:             boolean;
    sponsored?:                boolean;
    thumbnailUrl?:             string;
}

export enum ContentKind {
    Article = "Article",
    Exercise = "Exercise",
    Quiz = "Quiz",
    UnitTest = "UnitTest",
    Video = "Video",
}

export interface PublishedContentVersion {
    __typename:     string;
    contentVersion: string;
}
