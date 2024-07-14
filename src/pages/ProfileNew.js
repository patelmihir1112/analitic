import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProfile } from '../services/profileService';
import LocationSelectorNew from '../components/LocationSelectorNew';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  profileImage: yup.mixed().required('Profile Image is required'),
  age: yup.number().required('Age is required').min(1, 'Age must be at least 1'),
  gender: yup.string().required('Gender is required'),
  hobbies: yup.string().required('Hobbies are required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
});

const Profile = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await createProfile(data);
      console.log(res, "ss");
      if (res?.data?.success) {
        toast.success('Profile created successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        toast.error(res?.data?.error || 'Profile creation failed.');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className='bg-gray-100 flex p-4 justify-center items-center min-h-screen'>
      <div className='bg-white rounded p-8'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className='flex flex-col sm:flex-row  gap-2'>
            <div className=''>
              <label className='block text-gray-700'>First Name</label>
              <input {...register('firstName')} className='w-full p-1 border border-gray-500 rounded'></input>
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

            </div>
            <div className=''>
              <label className='block text-gray-700'>Last Name</label>
              <input {...register('lastName')} className='w-full p-1 border border-gray-500 rounded'></input>
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

            </div>
          </div>
          <div className=''>
            <label className='block text-gray-700'>Profile Image</label>
            <Controller
                name="profileImage"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                )}
              />
              {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage.message}</p>}
          </div>
          <div className=''>
            <label className='block text-gray-700'>Hobbies</label>
            <input className='w-full p-1 border border-gray-500 rounded'></input>
          </div>
          <div className='flex gap-2'>
            <div className='flex-1'>
              <label className='block text-gray-700'>Age</label>
              <input className='w-full p-1 border border-gray-500 rounded'></input>
            </div>
            <div className='flex-1'>
              <label className='block text-gray-700'>Gender</label>
              <select className="w-full p-1 border border-gray-500 rounded">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
            </div>
          </div>
          <LocationSelectorNew control={control} errors={errors} />
          <button className='bg-blue-500 rounded text-white p-2'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
