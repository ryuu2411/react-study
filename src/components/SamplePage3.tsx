import React from "react";

type Props = {
    Message: string
};

export const SamplePage3: React.VFC<Props> = (props) => {
    return <p>{props.Message}</p>
}