/* eslint-disable react/prop-types */
import logo from "../../assets/logobetter.png";
import '../../css/chatPage.css'

function Welcome({ user, text, center = false }) {
    return (
        !center
            ? <div className={`welcome-container !text-center`}>
                <img
                    src={logo}
                    alt="Sellorama Logo"
                    width={100} height={100}
                />
                <b>Hi{`${user?.shopOwner ? ", " + user.shopOwner : ""}`} 👋</b>
                {
                    text && <p>You haven&apos;t initiated any conversation yet!</p>
                }
            </div>

            : <div className={`flex flex-col justify-center items-center w-full`}>
                <img
                    src={logo}
                    alt="Sellorama Logo"
                    width={100} height={100}
                    className="mb-2"
                />
                <b>Hi{`${user?.shopOwner ? ", " + user.shopOwner : ""}`} 👋</b>
                {
                    text && <p>You haven&apos;t initiated any conversation yet!</p>
                }
            </div>
    );
}

export default Welcome;
