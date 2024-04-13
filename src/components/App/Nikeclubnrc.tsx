import { Space, Typography, notification } from 'antd'
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

const Nikeclubnrc = () => {
  return (
    <Space direction="vertical" style={{ width: '100%', overflowX: 'hidden', marginTop: '20px' }}>
      <Typography className="home_title" style={{ marginBottom: '20px', marginRight: '10px' }}>Nike Training Club</Typography>
      <div>
        <img
          className="img_banner"
          src="../../../nikenrc.jpg"
          alt="Banner 1"
          style={{ ...contentStyle }}
        />
      </div>

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
          src="../../../watchnrc.jpg"
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
          Your Perfect Running Partner
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
          Track your runs, get coaching that adapts to you and bring your friends along for the ride. It's all possible with the Nike Run Club App.
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
          src="../../../learmore.jpg"
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
          Track Your Progress
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
          Get all the detail you need—pace, location, distance, elevation, heart rate and mile splits—and greater control over what you see during your run.

        </Typography>
      </Space>


      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../musicnike.jpg"
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
          <strong>Stay Motivated
          </strong>
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

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../justdoit.jpg"
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
          <strong>Run Together
          </strong>
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
          Easily compare and compete with friends and fellow runners—just hashtag your miles against specific goals or challenges to see where you stand.
        </Typography>
      </Space>

      <div style={{ marginTop: '40px', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../get.jpg"
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
          Get Personalised Coaching
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
          Whatever your goal, your Nike Coach has a plan for you. One that starts with your goals and fitness level, and adapts as you progress.
        </Typography>


      </Space>

      <div style={{ marginTop: '40px', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../tag.jpg"
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
          Tag Your Shoes
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
          Keep track of how many miles you've run in every pair of running shoes you own—even the ones from other brands.

        </Typography>


      </Space>

      <div style={{ marginTop: '40px', overflowX: 'hidden' }}>
        <img
          className="img_banner"
          src="../../../tag.jpg"
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
          Tag Your Shoes
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
          Keep track of how many miles you've run in every pair of running shoes you own—even the ones from other brands.

        </Typography>

      </Space>

    </Space>
  )
}

export default Nikeclubnrc;


