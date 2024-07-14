import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProfile } from '../services/profileService';
import LocationSelector from '../components/LocationSelector';

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
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

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
    <div className="bg-gray-100 p-4 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row gap-1">
              <div className="">
                <label className="block text-gray-700">First Name</label>
                <input {...register('firstName')} className="w-full p-1 border border-gray-300 rounded" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>
              <div className="">
                <label className="block text-gray-700">Last Name</label>
                <input {...register('lastName')} className="w-full p-1 border border-gray-300 rounded" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Profile Image</label>
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
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700">Age</label>
                <input type="number" min="0" {...register('age')} className="w-full p-1 border border-gray-300 rounded" />
                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Gender</label>
                <select {...register('gender')} className="w-full p-1 border border-gray-300 rounded">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Hobbies</label>
              <input {...register('hobbies')} className="w-full p-1  border border-gray-300 rounded" />
              {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies.message}</p>}
            </div>
            <LocationSelector control={control} errors={errors} />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-100">Submit</button>
          </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Profile;
