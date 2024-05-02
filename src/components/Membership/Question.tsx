import { Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { useSpring, animated } from 'react-spring';
import './index.css'

const Question = () => {
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);

    const toggleVisibility1 = () => {
        setIsVisible1(!isVisible1);
    };

    const toggleVisibility2 = () => {
        setIsVisible2(!isVisible2);
    };

<<<<<<< Updated upstream
    const toggleVisibility3 = () => {
        setIsVisible3(!isVisible3);
    };
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Typography className="home_title">Frequently Asked Questions</Typography>
            <Space direction="vertical" className="mt-16 mb-3">
                <p onClick={toggleVisibility1} style={{ fontSize: 20, fontWeight: 500 }}>
                    What is Nike Membership?
                </p>
                <div className={`text-container ${isVisible1 ? 'visible' : ''} mt-10 mb-10`} style={{ fontSize: 20, fontWeight: 400 }}>
                    <p>Nike Membership is access to the very best of Nike through any of our apps, exclusive products and
                        Member-only experiences. Nike Members also enjoy free delivery, XX-day wear test and receiptless returns.
                        It's free and easy to join. Sign up.
                        <u className="font-bold"><Link to={'/signup'}> Sign up.</Link></u>
                    </p>
                </div>
            </Space>
            <hr />
            <Space direction="vertical" className="mb-3">
                <p onClick={toggleVisibility2} style={{ fontSize: 20, fontWeight: 500 }}>
                    Is Nike Membership free?
                </p>
                <div className={`text-container ${isVisible2 ? 'visible' : ''} mt-10 mb-10`} style={{ fontSize: 20, fontWeight: 400 }}>
                    <p>Maybe! If you've ever logged in to a Nike App, then yes, yes you are. Welcome back! If not, let's change that.
                        <u className="font-bold"><Link to={'/signup'}> Sign up.</Link></u>
                    </p>
                </div>
            </Space>
            <hr />
            <Space direction="vertical" className="mb-3">
                <p onClick={toggleVisibility3} style={{ fontSize: 20, fontWeight: 500 }}>
                    What is Nike Membership?
                </p>
                <div className={`text-container ${isVisible3 ? 'visible' : ''} mt-10 mb-10`} style={{ fontSize: 20, fontWeight: 400 }}>
                    <p>100% yes. Members enjoy all the benefits of Nike Membership at no cost, because once you're in,
                        we've got you. Zero money gets you access to all of it.
                    </p>
                </div>
            </Space>
            <hr />
=======
  const toggleVisibility3 = () => {
    setIsVisible3(!isVisible3)
  }
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography className="home_title">Các câu hỏi thường gặp</Typography>
      <Space direction="vertical" className="mt-16 mb-3">
        <p
          onClick={toggleVisibility1}
          style={{ fontSize: 20, fontWeight: 500 }}
        >
          Tư cách thành viên Nike là gì?
        </p>
        <div
          className={`text-container ${isVisible1 ? 'visible' : ''} mt-10 mb-10`}
          style={{ fontSize: 20, fontWeight: 400 }}
        >
          <p>
            Tư cách thành viên Nike là quyền truy cập vào những tính năng tốt nhất của Nike thông qua bất kỳ ứng dụng, sản phẩm độc quyền nào và trải nghiệm chỉ dành cho Thành viên của chúng tôi. Thành viên Nike cũng được hưởng giao hàng miễn phí, kiểm tra độ mòn trong XX ngày và trả lại hàng không cần biên nhận. Nó miễn phí và dễ dàng để tham gia.
            <u className="font-bold">
              <Link to={'/signup'}> Đăng ký.</Link>
            </u>
          </p>
        </div>
      </Space>
      <hr />
      <Space direction="vertical" className="mb-3">
        <p
          onClick={toggleVisibility2}
          style={{ fontSize: 20, fontWeight: 500 }}
        >
          Tôi có phải là thành viên của Nike không?
        </p>
        <div
          className={`text-container ${isVisible2 ? 'visible' : ''} mt-10 mb-10`}
          style={{ fontSize: 20, fontWeight: 400 }}
        >
          <p>
            Có lẽ! Nếu bạn đã từng đăng nhập vào Ứng dụng Nike thì đúng vậy. Chào mừng trở lại! Nếu không, hãy thay đổi điều đó.
            <u className="font-bold">
              <Link to={'/signup'}> Đăng ký.</Link>
            </u>
          </p>
        </div>
      </Space>
      <hr />
      <Space direction="vertical" className="mb-3">
        <p
          onClick={toggleVisibility3}
          style={{ fontSize: 20, fontWeight: 500 }}
        >
          Tư cách thành viên Nike có miễn phí không?
        </p>
        <div
          className={`text-container ${isVisible3 ? 'visible' : ''} mt-10 mb-10`}
          style={{ fontSize: 20, fontWeight: 400 }}
        >
          <p>
            100% có. Các thành viên được hưởng tất cả các lợi ích của Tư cách thành viên Nike mà không mất phí vì khi bạn tham gia, chúng tôi sẽ có bạn. Không có tiền giúp bạn có quyền truy cập vào tất cả.
          </p>
        </div>
      </Space>
      <hr />
>>>>>>> Stashed changes

            <img src="../../../nike-membership.jpg" alt="" className="mt-5" />
        </Space>
    )
}

export default Question;