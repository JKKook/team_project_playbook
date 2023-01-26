import styled from "@emotion/styled";
import Link from "next/link";
const HomeNavbar = ({ onClickCategory }) => {
    return (
        <>
            <List>
                <li value={"home"} onClick={onClickCategory}>
                    <Link href={"/"}>플레이북 추천</Link>
                </li>
                <li value={"new"}>
                    <Link href={"/mainPages/NewPerformance"}>신작 공연</Link>
                </li>
                <li value={"best"}>
                    <Link href={"/mainPages/BestPerformence"}>Best 공연</Link>
                </li>
            </List>
        </>
    );
};
export default HomeNavbar;

// styled component
const List = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-around;

    li {
        margin: 20px;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
    }

    @media screen and (max-width: 500px) {
        li {
            font-size: 15px;
        }
    }
`;
