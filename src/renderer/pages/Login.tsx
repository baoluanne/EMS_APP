import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import logo from '../assets/images/logo.png';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@renderer/shared/stores';

const CORRECT_USERNAME = 'admin';
const CORRECT_PASSWORD = '123456';

export default function Login() {
  const auth = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('ems_username');
    if (storedUser) {
      setUsername(storedUser);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setError('');
      localStorage.setItem('ems_username', CORRECT_USERNAME);
      auth.setUser({ id: CORRECT_PASSWORD });
      navigate('/dashboard');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  if (auth.isAuth) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="bg-white p-7 w-[420px]">
      {/* Header */}
      <div className="flex flex-col items-center mb-4">
        <img src={logo} alt="logo" className="w-20 h-20 object-contain drop-shadow-lg mb-2" />
        <div className="text-3xl font-bold text-[#a11d1d] tracking-widest">EMS</div>
        <div className="text-[#1e6d5a] font-semibold text-sm tracking-wide mt-1">
          PHÂN HỆ QUẢN LÝ ĐẠI HỌC
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="Tên đăng nhập"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            size="medium"
            margin="normal"
          />
          <TextField
            label="Mật khẩu"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="medium"
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                color="primary"
              />
            }
            label="Nhớ tên đăng nhập"
            className="mt-2"
          />
        </div>
        {error && <div className="text-red-600 text-sm text-center mb-2">{error}</div>}
        <div className="flex items-center justify-center gap-2 mt-2">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: 'bold', py: 1 }}
            className={'!uppercase'}
          >
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  );
}
