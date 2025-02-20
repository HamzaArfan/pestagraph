"use client";
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';

const BusinessReport = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('https://spiderhuntstechnologies.com/pentagraph/index2.php/api/company/broadwayrealty.com');
        const data = await response.json();
        setCompanyData(data);
      } catch (error) {
        console.error('Error fetching company data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div className="text-gray-300">Loading...</div>;
  }

  // Function to render social media links
  const renderSocialLinks = () => {
    const socials = companyData?.socials || {};
    return (
      <div className="flex flex-wrap gap-2">
        {socials.linkedin_url && (
          <a href={socials.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">LinkedIn</a>
        )}
        {socials.twitter_url && (
          <a href={socials.twitter_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Twitter</a>
        )}
        {socials.facebook_url && (
          <a href={socials.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Facebook</a>
        )}
        {socials.instagram_url && (
          <a href={socials.instagram_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Instagram</a>
        )}
        {socials.youtube_url && (
          <a href={socials.youtube_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">YouTube</a>
        )}
      </div>
    );
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-900 dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar/>
        <div className="px-40 flex flex-1 justify-center py-5 mt-14">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-gray-300 tracking-light text-3xl font-bold leading-tight min-w-72">Business Report</p>
            </div>
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                <div className="flex gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{ backgroundImage: `url("${companyData?.logo_url || '/placeholder-logo.png'}")` }}
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-300 text-[22px] font-bold leading-tight tracking-[-0.015em]">{companyData?.name || 'Company Name'}</p>
                    <p className="text-gray-500 text-base font-normal leading-normal">
                      {companyData?.domain || 'Domain'} · Est. {companyData?.founded_year || 'Year'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 grid grid-cols-2">
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pr-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Industry</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">{companyData?.industry || 'N/A'}</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pl-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Categories</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">
                  {companyData?.categories?.join(', ') || 'N/A'}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pr-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Employee Range</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">{companyData?.employees || 'N/A'}</p>
              </div>
              
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pl-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Revenue Range</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">{companyData?.revenue || 'N/A'}</p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 col-span-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Social Media</p>
                {renderSocialLinks()}
              </div>

              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pr-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Technologies</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">
                  {companyData?.technologies?.join(', ') || 'N/A'}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pl-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Industry</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">
                  {companyData.industry}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 col-span-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Description</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">{companyData?.description || 'N/A'}</p>
              </div>
            </div>
            
            <h2 className="text-gray-300 text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Location & Contact</h2>
            <div className="p-4 grid grid-cols-2">
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pr-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Address</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">
                  {companyData?.location?.address || 'N/A'}, {companyData?.location?.state?.name || ''} {companyData?.location?.country?.name || ''}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-t border-solid border-gray-800 py-4 pl-2">
                <p className="text-gray-500 text-sm font-normal leading-normal">Phone</p>
                <p className="text-gray-300 text-sm font-normal leading-normal">{companyData?.location?.phone || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessReport;