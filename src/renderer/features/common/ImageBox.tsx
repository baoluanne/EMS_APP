import { Box, Typography, CircularProgress } from '@mui/material';
import { useMutation } from '@renderer/shared/mutations';
import { useState, useEffect } from 'react';

const ImageBox = ({
  src = '',
  alt = 'Ảnh',
  width = '100%',
  height = 160,
  border = '1px solid #ccc',
  borderRadius = 1,
  bgcolor = 'white',
  onClick = undefined,
  placeholder = 'Ảnh',
  sx = {},
}) => {
  const { mutateAsync: fetchImageUrl } = useMutation<any>('document/get-presigned-url', 'get');
  // State để lưu URL ảnh cuối cùng sẽ được hiển thị
  const [imageUrl, setImageUrl] = useState(null);
  // State để quản lý trạng thái tải
  const [isLoading, setIsLoading] = useState(false);
  // State để quản lý lỗi
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Chỉ chạy nếu có src được cung cấp
    if (src) {
      setIsLoading(true);
      setError(null);
      setImageUrl(null); // Reset URL cũ

      const load_image = async () => {
        try {
          const resultUrl = await fetchImageUrl(src);
          setImageUrl(resultUrl);
        } catch (err) {
          console.error('Error fetching image:', err);
          setError('Không thể tải ảnh');
        } finally {
          setIsLoading(false);
        }
      };

      load_image();
    } else {
      // Nếu src bị xóa hoặc là chuỗi rỗng
      setImageUrl(null);
      setError(null);
      setIsLoading(false);
    }
  }, [src]); // Dependency array: Re-run khi prop src thay đổi

  // Xác định nội dung hiển thị trong Box
  let content;

  if (isLoading) {
    content = <CircularProgress size={24} color="primary" />;
  } else if (error) {
    content = (
      <Typography variant="body2" color="error.main">
        {error}
      </Typography>
    );
  } else if (imageUrl) {
    content = (
      <img
        src={imageUrl}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    );
  } else {
    content = (
      <Typography variant="body2" color="text.secondary">
        {placeholder}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width,
        height,
        border,
        borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        ...sx,
      }}
      onClick={onClick}
    >
      {content}
    </Box>
  );
};

export default ImageBox;
