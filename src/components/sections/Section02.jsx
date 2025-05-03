import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Section02 = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 날짜를 melon JSON 파일명 형식으로 변환
  const getTodayString = (offset = 0) => {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + offset); // offset: 0 = today, -1 = yesterday ...
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month}-${date}-${year}`;
  };

  useEffect(() => {
    const fetchChartData = async () => {
      for (let offset = 0; offset > -7; offset--) {
        const dateStr = getTodayString(offset);
        const url = `https://raw.githubusercontent.com/woogamjaa/Music_Chart_data/main/melon/melon100_${dateStr}.json`;

        try {
          const response = await axios.get(url);
          setChartData(response.data);
          break; // 성공 시 반복 종료
        } catch (err) {
          if (offset === -6) {
            console.error('최근 7일간 데이터가 존재하지 않습니다.');
          }
        }
      }
      setLoading(false);
    };

    fetchChartData();
  }, []);

  if (loading) return <div>데이터 불러오는 중...</div>;

  return (
    <div className="section02">
      <div className="section2-content">
        <h2>Melon Top 100</h2>
        {chartData.map((song) => (
          <div key={song.rank} className="song-item">
            <img src={song.imageURL} alt={song.title} />
            <div>
              <strong>{song.rank}. {song.title}</strong><br />
              <span>{song.artist}</span><br />
              <em>{song.album}</em>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section02;