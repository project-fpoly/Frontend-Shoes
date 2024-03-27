import AlsoGet from "../../components/Membership/AlsoGet"
import Banner from "../../components/Membership/Banner"
import Benefits from "../../components/Membership/Benefits"
import Connect from "../../components/Membership/Connect"
import Question from "../../components/Membership/Question"

const Membership = () => {
    return (
        <div className="px-10">
            <div className="flex justify-center mt-20 mb-1 items-center flex-col">
                <Banner />
                <Benefits />
                <AlsoGet />
                <Connect />
                <Question />
            </div>
        </div>
    )
}

export default Membership