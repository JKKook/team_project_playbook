import { async } from "@firebase/util";
import axios from "axios";
import { useQuery } from "react-query";

const KEY = "98e02b76a394447699b7324b7ff14b83";
const testFetch = async () => {
    const res = await axios.get(
        `/get?service=${KEY}&stdate=20221201&eddate=20230401&cpage=1&rows=8`
    );
    console.log(res);
    return res;
};

const Test = () => {
    const { data, isLoading } = useQuery("test", testFetch);
    return <div>테스트입니다</div>;
};

export default Test;
