export function getGeolocationData(
  onGeolocationData: (data: {
    latitude: number | null;
    longitude: number | null;
  }) => void
) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onGeolocationData({ latitude, longitude });
      },
      (error) => {
        console.error("發生錯誤", error);
      },
      { enableHighAccuracy: true }
    );
  } else {
    console.error("瀏覽器不支援地理位置功能");
  }
}
