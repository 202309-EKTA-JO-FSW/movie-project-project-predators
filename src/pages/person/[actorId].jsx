import React, { useState, useEffect } from 'react';
import { getActor } from "@/util/API"
import { useRouter } from 'next/router';

export default function Actor() {
  const router = useRouter();
  const { actorId } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (actorId) {
      fetchData();
    }
  }, [actorId]);
  
  const setActor = async (actorId) => {
    try {
      const result = await getActor(actorId);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await setActor(actorId);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='theactor'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='both'>
          <div className='actorCard'>
              <div className='imageContainer'>
                <img src={'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + data?.profile_path} alt={data?.name} />
                </div>
                <ul className='listStyle'>
                    <li>
                      <h1><span>{data?.name}</span></h1>
                    </li>
                    <li className='list'>
                      <p>Gender: <span>
                        {data && (
                          <span>
                            {data.gender === 1 ? (
                              <span>Female</span>
                            ) : data.gender === 2 ? (
                              <span>Male</span>
                            ) : (
                              <span>--</span>
                            )}
                          </span>
                        )}
                      </span></p>
                    </li>
                    <li>
                      <p>Popularity: <span>{data?.popularity}</span></p>
                    </li>
                    <li>
                      <p>Birthday: <span>{data?.birthday}</span></p>
                    </li>
                  <li>
                    <div className='horizontalLine'></div>
                  </li>
                  <li>
                    <p className='bio'>
                      <b>Biography:</b> <div>{expanded ? data?.biography : `${data?.biography.slice(0, 1155)}`}
                        {data?.biography.length > 1155 && (
                          <span className='readMore' onClick={toggleExpanded}>
                            {expanded ? ' Read Less' : '... Read More'}
                          </span>
                        )}
                      </div>
                    </p>
                  </li>
                </ul>
          </div>
        </div>
      )}
    </div>
  );
}