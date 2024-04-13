
import { Carousel } from 'antd'
import { Space, Typography } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperNavButtons } from './SwiperNavButton'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import Meta from 'antd/es/card/Meta'
import 'swiper/css'
import 'swiper/css/pagination'
import './index.css'

import { Link } from 'react-router-dom'


const contentStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

const Nikeclub = () => {

  return (
    <Space direction="vertical" style={{ width: '100%', overflowX: 'hidden' }}>
      <Typography className="home_title">Nike Training Club</Typography>
      <Carousel autoplay autoplaySpeed={1000} style={{ width: '100%' }}>
        <div>
          <img
            className="img_banner"
            src="../../../bannerappjpg.jpg"
            alt="Banner 1"
            style={{ ...contentStyle }}
          />
        </div>
        <div>
          <img
            className="img_banner"
            src="../../../bannerapp2.jpg"
            alt="Banner 3"
            style={{ ...contentStyle, objectFit: 'cover' }}
          />
        </div>
        <div>
          <img
            className="img_banner"
            src="../../../bannerapp3.jpg"
            alt="Banner 3"
            style={{ ...contentStyle, objectFit: 'cover' }}
          />
        </div>
      </Carousel>

      <Space
        direction="vertical"
        style={{ width: '100%', marginLeft: '220px' }}
      >
        <Typography
          className="mt-5"
          style={{ fontSize: 35, fontFamily: 'inherit', textAlign: 'left' }}
        >
          A Year Of You
        </Typography>

        <Typography className="mb-5 text-lg" style={{ textAlign: 'left' }}>
          Nike Members’ Moves In 2022.
        </Typography>

        <Link
          style={{ background: 'rgb(17, 17, 17)', fontSize: '20px', padding: '10px 20px', borderRadius: '100px' }}
          to="/membership"
          className="text-white hover:!text-white hover:!border-white hover:!bg-stone-700 mb-2"
        >
          Watch Now
        </Link>
      </Space>

      <div style={{ marginTop: '40px', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../nike-training-club-app-home-workouts-more.jpg"
          alt="Banner 1"
          style={{ ...contentStyle }}
        />
      </div>

      <Space
        direction="vertical"
        style={{ width: '100%', marginLeft: '220px', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          className="mt-5"
          style={{ fontSize: 35, fontFamily: 'inherit', textAlign: 'left' }}
        >
          Come Train With Us
        </Typography>

        <Typography
          style={{
            width: '669px',
            textAlign: 'left',
            fontSize: '20px',
            lineHeight: '1.7',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          The Nike Training Club App helps you reach your fitness goals with expertly designed workouts from our world-class Nike Master Trainers. NTC is perfect for training at home, in the gym or on the road, with everything from bodyweight-only to full-equipment workouts for everyone at all fitness levels.
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
          <Link
            style={{ background: 'rgb(17, 17, 17)', fontSize: '20px', padding: '7px 20px', borderRadius: '100px', marginRight: '10px' }}
            to="https://apps.apple.com/us/app/nike-training-club-wellness/id301521403"
            className="text-white hover:!text-white hover:!border-white hover:!bg-stone-700 mb-2"
          >
            Download for iOS
          </Link>
          <Link
            style={{ background: 'rgb(17, 17, 17)', fontSize: '20px', padding: '7px 20px', borderRadius: '100px' }}
            to="https://play.google.com/store/apps/details?id=com.nike.ntc&hl=en_US&pli=1"
            className="text-white hover:!text-white hover:!border-white hover:!bg-stone-700 mb-2"
          >
            Download for Android
          </Link>
        </div>
      </Space>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../nike-ntc2.jpg"
          alt="Banner 1"
          style={{ ...contentStyle, maxWidth: '70%' }}
        />
      </div>
      <Space
        direction="vertical"
        style={{ width: '100%', marginLeft: '220px', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          className="mt-5"
          style={{ fontSize: 35, fontFamily: 'inherit', textAlign: 'left' }}
        >
          Flexible Training Plans Tailored to You
        </Typography>

        <Typography
          style={{
            width: '669px',
            textAlign: 'left',
            fontSize: '20px',
            lineHeight: '1.7',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          The Nike Training Club App helps you reach your fitness goals with expertly designed workouts from our world-class Nike Master Trainers. NTC is perfect for training at home, in the gym or on the road, with everything from bodyweight-only to full-equipment workouts for everyone at all fitness levels.
        </Typography>
      </Space>
      <>
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Các phần nội dung trước đó */}
        </Space>

        <div style={{ marginTop: '40px', overflowX: 'hidden' }}>
          {/* Ảnh tiếp theo */}
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={40}
            slidesPerView="auto"
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            <div className="flex items-center" style={{ justifyContent: 'center', marginTop: '10px' }}>
              {/* Sử dụng style */}
              <SwiperNavButtons style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '5px 10px', marginRight: '10px' }} />

            </div>


            {/* Hiển thị ảnh */}
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../startup2.jpg"
                alt="Next Image 1"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Lean Fit
                </strong>}
                description="Get lean and fit over 6 weeks with a balanced plan that builds endurance.

                "
              />
            </SwiperSlide>
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../startup3.jpg"
                alt="Next Image 2"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Bodyweight Only
                </strong>}
                description="Push your strength and improve muscle tone over 4 weeks—all without weights.
                "
              />
            </SwiperSlide>
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../startup1.jpg"
                alt="Next Image 3"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Start Up</strong>}
                description="Kick it off with 4 weeks of guided, well-balanced workouts to get you fit.

                "
              />
            </SwiperSlide>
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../startup4.jpg"
                alt="Next Image 4"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Gym Strong
                </strong>}
                description="Build full-body strength with a focus on weight training over 8 weeks.
                "
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../nile-ntc3.jpg"
          alt="Banner 1"
          style={{ ...contentStyle, maxWidth: '70%' }}
        />
      </div>
      <Space
        direction="vertical"
        style={{ width: '100%', marginLeft: '220px', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          className="mt-5"
          style={{ fontSize: 35, fontFamily: 'inherit', textAlign: 'left' }}
        >
          <strong>Train the Way You Want</strong>
        </Typography>

        <Typography
          style={{
            width: '669px',
            textAlign: 'left',
            fontSize: '20px',
            lineHeight: '1.7',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Energise your routine with our growing library of workouts led by our world-class Nike Master Trainers. With NTC, you get access to over 190 free workouts across strength, endurance, yoga and mobility targeting your abs, arms, shoulders, glutes and legs. Sessions range from 15–45 minutes and are designed to help you see and feel results.



        </Typography>
      </Space>

      <>
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Các phần nội dung trước đó */}
        </Space>

        <div style={{ marginTop: '40px', overflowX: 'hidden' }}>
          {/* Ảnh tiếp theo */}
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={40}
            slidesPerView="auto"
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            <div className="flex items-center" style={{ justifyContent: 'center', marginTop: '10px' }}>
              {/* Sử dụng style */}
              <SwiperNavButtons style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '5px 10px', marginRight: '10px' }} />

            </div>


            {/* Hiển thị ảnh */}
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../yoga.jpg"
                alt="Next Image 1"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Yoga

                </strong>}
                description="Deepen your practice through traditional yoga flows with a Nike spin.



                "
              />
            </SwiperSlide>
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../hit.jpg"
                alt="Next Image 2"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Cardio and HIT

                </strong>}
                description="Build your full body endurance with high-intensity training drills, kickboxing and more.


                "
              />
            </SwiperSlide>
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../strength.jpg"
                alt="Next Image 3"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Strength Training
                </strong>}
                description="Challenge yourself with targeted workouts for your arms, core and glutes.



                "
              />
            </SwiperSlide>
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../mob.jpg"
                alt="Next Image 4"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Mobility
                </strong>}
                description="Improve your movement quality and flexibility with active recovery sessions.


                "
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../feature.jpg"
          alt="Banner 1"
          style={{ ...contentStyle, maxWidth: '70%' }}
        />
      </div>
      <Space
        direction="vertical"
        style={{ width: '100%', marginLeft: '220px', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          className="mt-5"
          style={{ fontSize: 35, fontFamily: 'inherit', textAlign: 'left' }}
        >
          <strong>Featured Workout Collections</strong>
        </Typography>

        <Typography
          style={{
            width: '669px',
            textAlign: 'left',
            fontSize: '20px',
            lineHeight: '1.7',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Workout Collections offer a set of recommended workouts and guidance from our Nike Master Trainers. They are a great way to discover new workouts, try community favourites or simply find the right workout for you and your daily routine. Here's a few of our favourites.




        </Typography>
      </Space>

      <>
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Các phần nội dung trước đó */}
        </Space>

        <div style={{ marginTop: '40px', overflowX: 'hidden' }}>
          {/* Ảnh tiếp theo */}
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={40} // Điều chỉnh khoảng cách giữa các ảnh
            slidesPerView={3} // Hiển thị chính xác 3 ảnh trên màn hình
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            {/* Hiển thị ảnh */}
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../simple.jpg"
                alt="Next Image 2"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Simple Routines for Better Runs
                </strong>}
                description="Quick workouts to warm up before or cool down after your run.

                "
              />
            </SwiperSlide>
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../abs.jpg"
                alt="Next Image 3"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Best of Abs, Arms and Glutes
                </strong>}
                description="Discover our most popular workouts—all in one place.

                "
              />
            </SwiperSlide>
            <SwiperSlide className="" style={{ width: '400px' }}>
              <img
                className="img_banner"
                src="../../../yoga2.jpg"
                alt="Next Image 4"
                style={{ ...contentStyle }}
              />
              <Meta
                title={<strong>Enhance Your Training with Yoga
                </strong>}
                description="Add yoga to your routine to improve your strength, stability and flexibility.

                "
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </>

      <div style={{ marginTop: '40px', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../celebrate.jpg"
          alt="Banner 1"
          style={{ ...contentStyle }}
        />
      </div>

      <Space
        direction="vertical"
        style={{ width: '100%', marginLeft: '220px', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          className="mt-5"
          style={{ fontSize: 35, fontFamily: 'inherit', textAlign: 'left' }}
        >
          Celebrate Your Achievements
        </Typography>

        <Typography
          style={{
            width: '669px',
            textAlign: 'left',
            fontSize: '20px',
            lineHeight: '1.7',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Earn badges and trophies for reaching workout milestones like total workouts completed, workout frequency, weekly and monthly streaks, and more.

        </Typography>


      </Space>



    </Space>
  )
}

export default Nikeclub;
