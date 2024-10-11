export interface AssessmentItemResponse {
    data: Data;
}

export interface Data {
    assessmentItem: AssessmentItem;
}

export interface AssessmentItem {
    __typename: string;
    error:      null;
    item:       Item;
}

export interface Item {
    __typename:  string;
    id:          string;
    itemData:    string;
    problemType: string;
    sha:         string;
}
