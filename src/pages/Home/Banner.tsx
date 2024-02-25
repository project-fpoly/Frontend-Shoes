import { Carousel } from "antd";
import "./index.css"

const contentStyle: React.CSSProperties = {
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Banner = () => {
    return (
        <Carousel autoplay autoplaySpeed={2500}>
            <div>
                <img className="img_banner" src="../../../banner.jpg" alt="Banner 1" style={{ ...contentStyle }} />
            </div>
            <div>
                <img className="img_banner" src="../../../banner2.jpg" alt="Banner 3" style={{ ...contentStyle, objectFit: 'cover' }} />
            </div>
            <div>
                <img className="img_banner" src="../../../banner3.jpg" alt="Banner 3" style={{ ...contentStyle, objectFit: 'cover' }} />
            </div>
        </Carousel>
    )
}

export default Banner;