"use client";

import React, { useState } from 'react';
import {
  UserIcon,
  CubeIcon,
  FolderIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '@/redux/actions/LogoutAction';
import Link from 'next/link';

const SidebarComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdown, setDropdown] = useState(null); 

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);  
  
  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  const toggleDropdown = (section) => {
    setDropdown(dropdown === section ? null : section);
  };

  return (
    <div className={`bg-gray-100 text-gray-800 h-full ${isOpen ? 'w-76' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="flex flex-col items-start p-4 ">
        <button
          className="p-2 mb-4 text-xl text-gray-500 lg:block hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '☰' : '❯'}
        </button>

        <Link className={`text-xl font-medium text-black mb-6 ${!isOpen && 'hidden'} flex items-center gap-2 mt-20 md:mt-2`} href='/dashboard'>
          <HomeIcon className="h-5 w-5 text-gray-600" />
          Dashboard
        </Link>

        <ul className="space-y-6 mt-10">
          {/* Users Dropdown */}
          <li>
            <Link
              href="#"
              onClick={() => toggleDropdown('users')}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <UserIcon className="h-5 w-5 text-gray-600" />
              <span className={`${!isOpen ? 'hidden' : ''}`}>Users</span>
            </Link>
            <ul
              className={`space-y-2 pl-8 transition-all duration-300 ease-in-out overflow-hidden ${dropdown === 'users' ? 'max-h-96' : 'max-h-0'}`}
            >
              <li className="flex items-center space-x-2">
                <PlusIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/users/create" className="text-gray-600 hover:text-gray-900">Create User</Link>
              </li>
              <li className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/users/all" className="text-gray-600 hover:text-gray-900">Get Users</Link>
              </li>
              <li className="flex items-center space-x-2">
                <PencilIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/users/update" className="text-gray-600 hover:text-gray-900">Update User</Link>
              </li>
              <li className="flex items-center space-x-2">
                <TrashIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/users/delete" className="text-gray-600 hover:text-gray-900">Delete User</Link>
              </li>
            </ul>
          </li>

          {/* Products Dropdown */}
          <li>
            <Link
              href="#"
              onClick={() => toggleDropdown('products')}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <CubeIcon className="h-5 w-5 text-gray-600" />
              <span className={`${!isOpen ? 'hidden' : ''}`}>Products</span>
            </Link>
            <ul
              className={`space-y-2 pl-8 transition-all duration-300 ease-in-out overflow-hidden ${dropdown === 'products' ? 'max-h-96' : 'max-h-0'}`}
            >
              <li className="flex items-center space-x-2">
                <PlusIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/products/create" className="text-gray-600 hover:text-gray-900">Create Product</Link>
              </li>
              <li className="flex items-center space-x-2">
                <CubeIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/products/all" className="text-gray-600 hover:text-gray-900">Get Products</Link>
              </li>
              <li className="flex items-center space-x-2">
                <PencilIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/products/update" className="text-gray-600 hover:text-gray-900">Update Product</Link>
              </li>
              <li className="flex items-center space-x-2">
                <TrashIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/products/delete" className="text-gray-600 hover:text-gray-900">Delete Product</Link>
              </li>
            </ul>
          </li>

          {/* Categories Dropdown */}
          <li>
            <Link
              href="#"
              onClick={() => toggleDropdown('categories')}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <FolderIcon className="h-5 w-5 text-gray-600" />
              <span className={`${!isOpen ? 'hidden' : ''}`}>Categories</span>
            </Link>
            <ul
              className={`space-y-2 pl-8 transition-all duration-300 ease-in-out overflow-hidden ${dropdown === 'categories' ? 'max-h-96' : 'max-h-0'}`}
            >
              <li className="flex items-center space-x-2">
                <PlusIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/categories/create" className="text-gray-600 hover:text-gray-900">Create Category</Link>
              </li>
              <li className="flex items-center space-x-2">
                <FolderIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/categories/all" className="text-gray-600 hover:text-gray-900">Get Categories</Link>
              </li>
              <li className="flex items-center space-x-2">
                <PencilIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/categories/update" className="text-gray-600 hover:text-gray-900">Update Category</Link>
              </li>
              <li className="flex items-center space-x-2">
                <TrashIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/categories/delete" className="text-gray-600 hover:text-gray-900">Delete Category</Link>
              </li>
            </ul>
          </li>

          {/* Suppliers Dropdown */}
          <li>
            <Link
              href="#"
              onClick={() => toggleDropdown('suppliers')}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <BuildingOfficeIcon className="h-5 w-5 text-gray-600" />
              <span className={`${!isOpen ? 'hidden' : ''}`}>Suppliers</span>
            </Link>
            <ul
              className={`space-y-2 pl-8 transition-all duration-300 ease-in-out overflow-hidden ${dropdown === 'suppliers' ? 'max-h-96' : 'max-h-0'}`}
            >
              <li className="flex items-center space-x-2">
                <PlusIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/suppliers/create" className="text-gray-600 hover:text-gray-900">Create Supplier</Link>
              </li>
              <li className="flex items-center space-x-2">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/suppliers/all" className="text-gray-600 hover:text-gray-900">Get Suppliers</Link>
              </li>
              <li className="flex items-center space-x-2">
                <PencilIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/suppliers/update" className="text-gray-600 hover:text-gray-900">Update Supplier</Link>
              </li>
              <li className="flex items-center space-x-2">
                <TrashIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/suppliers/delete" className="text-gray-600 hover:text-gray-900">Delete Supplier</Link>
              </li>
            </ul>
          </li>

          {/* Payments Dropdown */}
          <li>
            <Link
              href="#"
              onClick={() => toggleDropdown('payments')}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <CreditCardIcon className="h-5 w-5 text-gray-600" />
              <span className={`${!isOpen ? 'hidden' : ''}`}>Payments</span>
            </Link>
            <ul
              className={`space-y-2 pl-8 transition-all duration-300 ease-in-out overflow-hidden ${dropdown === 'payments' ? 'max-h-96' : 'max-h-0'}`}
            >
              <li className="flex items-center space-x-2">
                <PlusIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/payments/create" className="text-gray-600 hover:text-gray-900">Create Payment</Link>
              </li>
              <li className="flex items-center space-x-2">
                <CreditCardIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/payments/all" className="text-gray-600 hover:text-gray-900">Get Payments</Link>
              </li>
              <li className="flex items-center space-x-2">
                <PencilIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/payments/update" className="text-gray-600 hover:text-gray-900">Update Payment</Link>
              </li>
              <li className="flex items-center space-x-2">
                <TrashIcon className="h-5 w-5 text-gray-600" />
                <Link href="/dashboard/payments/delete" className="text-gray-600 hover:text-gray-900">Delete Payment</Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* Profile and Logout Links at the bottom */}
        <div className="mt-auto space-y-2 flex flex-col top-0 bottom-0 h-full gap-5">
          <Link href="/dashboard/users/profile" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors mt-10">
            <UserCircleIcon className="h-5 w-5 text-gray-600" />
            <span className={`${!isOpen ? 'hidden' : ''}`}>Profile</span>
          </Link>
          <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors " onClick={handleLogout}>
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-600" />
            <span className={`${!isOpen ? 'hidden' : ''}`} >Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;
