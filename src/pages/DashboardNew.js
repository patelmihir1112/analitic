import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { getProfiles } from '../services/profileService';
import Loader from '../components/Loader';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const locationChartRef = useRef(null);
  const ageGroupChartRef = useRef(null);

  // Declare chart instance refs
  const locationChartInstance = useRef(null);
  const ageGroupChartInstance = useRef(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await getProfiles();
      setProfiles(response?.data);
      setLoading(false);
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (profiles.length > 0) {
      createCharts();
    }

    return () => {
      if (locationChartInstance.current) {
        locationChartInstance.current.destroy();
      }
      if (ageGroupChartInstance.current) {
        ageGroupChartInstance.current.destroy();
      }
    };
  }, [profiles]);

  const createCharts = () => {
    const locationCtx = locationChartRef.current.getContext('2d');
    if (locationChartInstance.current) {
      locationChartInstance.current.destroy();
    }
    const locationCounts = profiles.reduce((acc, profile) => {
      const location = `${profile.city}, ${profile.state}, ${profile.country}`;
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});

    locationChartInstance.current = new Chart(locationCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(locationCounts),
        datasets: [{
          label: 'Profiles Created',
          data: Object.values(locationCounts),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            beginAtZero: true,
            stacked: true,
          }
        }
      }
    });

    // Chart for Profiles by Age Group
    const ageGroupCtx = ageGroupChartRef.current.getContext('2d');
    if (ageGroupChartInstance.current) {
      ageGroupChartInstance.current.destroy();
    }
    const ageGroups = {
      '0-20': profiles.filter(profile => profile.age <= 20).length,
      '21-40': profiles.filter(profile => profile.age > 20 && profile.age <= 40).length,
      '41-60': profiles.filter(profile => profile.age > 40 && profile.age <= 60).length,
      '61+': profiles.filter(profile => profile.age > 60).length,
    };

    ageGroupChartInstance.current = new Chart(ageGroupCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(ageGroups),
        datasets: [{
          label: 'Profiles by Age Group',
          data: Object.values(ageGroups),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
              }
            }
          }
        }
      }
    });
  };

  const getTopProfiles = () => {
    const sortedProfiles = [...profiles].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).slice(0, 4);
    return sortedProfiles;
  };







  return (
    <>
      <div className='min-h-screen bg-gray-100 p-4'>
        <header className='flex flex-wrap justify-between items-center shadow bg-white p-4 gap-2 mb-4'>
          <h2 className='font-bold text-2xl w-full md:w-auto text-center md:text-left'>Dashboard</h2>
          <div className='hidden md:flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto'>
            <button className='border bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4'>Create Profile</button>
            <button className='border bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4'>Create Profile</button>
            <button className='border bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4'>Create Profile</button>
            <button className='border bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4'>Create Profile</button>
            <button className='border bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4'>Create Profile</button>
            <button className='border bg-blue-500 hover:bg-blue-700 rounded text-white py-2 px-4'>Create Profile</button>
            <button className='border bg-red-500 hover:bg-red-700 text-white rounded py-2 px-4'>Logout</button>
          </div>
        <div>
          
        </div>
        </header>

        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4'>
          <div className='bg-white p-6 shadow rounded'>
            <h2 className='font-semibold mb-2'> Profiles Created by Location</h2>
            <canvas ref={locationChartRef} id="locationChart" style={{ maxWidth: '100%', maxHeight: '200px' }}></canvas>

          </div>
          <div className='bg-white p-6 shadow rounded'>
            <h2 className='font-semibold mb-2'>Profiles by Age Group</h2>
            <canvas ref={ageGroupChartRef} id="ageGroupChart" style={{ maxWidth: '100%', maxHeight: '200px' }}></canvas>
          </div>
        </div>
        <div className='bg-white grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-8 mb-4'>
          {getTopProfiles().map((profile, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{profile.firstName}, {profile.lastName}</h3>
              <p className="text-gray-600">Age: {profile.age}</p>
              <p className="text-gray-600">Location: {profile.city}, {profile.state}, {profile.country}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 shadow rounded mb-8">
          <h2 className="text-2xl font-bold mb-4">Profiles</h2>
          <div className='overflow-x-auto'>
            <table className='w-full border rounded'>
              <thead>
                <tr>
                  <th className='py-1 px-2 border text-left'>First Name</th>
                  <th className='py-1 px-2 border text-left'>Last Name</th>
                  <th className='py-1 px-2 border text-left'>Age</th>
                  <th className='py-1 px-2 border text-left'>Gender</th>
                  <th className='py-1 px-2 border text-left'>Hobbies</th>
                  <th className='py-1 px-2 border text-left'>Country</th>
                  <th className='py-1 px-2 border text-left'>State</th>
                  <th className='py-1 px-2 border text-left'>City</th>
                </tr>

              </thead>
              <tbody>
                {profiles.map((profile, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition duration-100">
                    <td className="py-2 px-4 border">{profile.firstName}</td>
                    <td className="py-2 px-4 border">{profile.lastName}</td>
                    <td className="py-2 px-4 border">{profile.age}</td>
                    <td className="py-2 px-4 border">{profile.gender}</td>
                    <td className="py-2 px-4 border">{profile.hobbies}</td>
                    <td className="py-2 px-4 border">{profile.country}</td>
                    <td className="py-2 px-4 border">{profile.state}</td>
                    <td className="py-2 px-4 border">{profile.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;
