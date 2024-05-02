import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, message, notification } from 'antd'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SiNike } from 'react-icons/si'
import { setUser } from '../../../features/auth'

const Password = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const email =
    useSelector((state: any) => state.auth.user)?.email || params.get('email')
  const role = useSelector((state: any) => state.auth.user)

  const getUserID = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )
    return JSON.parse(jsonPayload)['_id']
  }
  const handleSubmit = async (values: { password: string }) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/auth/signin',
        {
          email,
          password: values.password,
        },
      )
      if (response && response.status === 200) {
        const userID = getUserID(response.data.accessToken)
        response.data.accessToken && localStorage.setItem('userID', userID)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('email', email)
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${response.data.accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }
        axios
          .get(`http://localhost:9000/api/auth/user`, config)
          .then((res) => {
            dispatch(setUser(res.data.user))
            // alert('Login successfully');
            notification.success({
              message: 'Login successfully',
              placement: 'top',
            })
            if (res.data.user.role === 'admin') {
              navigate('/admin')
            } else {
              navigate('/')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } catch (e: any) {
      e.response.data.message &&
        notification.error({
          message: 'Login failed',
          description: e.response.data.message,
          placement: 'top',
        })
      if (e.response.data.code === 404) {
        navigate('/signup')
      }
      // console.log(e);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center flex items-center justify-center">
          <SiNike className="vertical-align: middle" size={50} />
        </div>
        <section>
          <Form
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            name="form_item_path"
            layout="vertical"
            onFinish={(e) => handleSubmit(e)}
            autoComplete="off"
          >
            <h1 className="text-2xl font-normal sm:text-4xl">
              Enter password for email: {email}
            </h1>

            <Form.Item
              className="text-black font-bold"
              name="password"
              rules={[
                {
                  message: 'Mandatory!',
                  required: true,
                },
              ]}
            >
              <Input.Password
                className="border border-black"
                size="large"
                placeholder="Password"
              />
            </Form.Item>
            <p className="text-sm mt-4 font-medium leading-none text-gray-500">
              <span
                tabIndex={0}
                role="link"
                aria-label="Sign up here"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {' '}
                <Link to="/forgotpassword">Forgot Password?</Link>
                <div style={{ marginTop: '5px', textDecorationLine: 'none' }}>
                  Don't have an account? <Link to="/signup">Sign up here</Link>
                </div>
              </span>
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className="rounded-full btn-primary-dark btn-md"
                htmlType="submit"
                style={{
                  color: 'white',
                  backgroundColor: 'black',
                  borderColor: 'black',
                  padding: '24px',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Để căn giữa theo chiều ngang
                  marginLeft: 'auto', // Để nút sang bên phải
                }}
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              >
                Continue
              </Button>
            </div>
          </Form>
        </section>
      </div>
    </div>
  )
}

export default Password
