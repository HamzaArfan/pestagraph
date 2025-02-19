"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";

const PhoneEmail = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  // Function to fetch data from API
  const fetchProfileData = async () => {
    try {
      const response = await fetch('https://leakosintapi.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: "6653420429:jJSmds3a",
          request: "19177839188",
          limit: 100,
          lang: "en"
        })
      });
      
      const data = await response.json();
      
      // Process and organize the data
      const processedData = processApiResponse(data);
      setProfileData(processedData);
    } catch (err) {
      setError('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  // Process API response into organized data structure
  const processApiResponse = (apiData) => {
    const processed = {
      phones: new Set(),
      emails: new Set(),
      fullNames: new Set(),
      addresses: new Set(),
      websites: new Set()
    };

    Object.values(apiData.List).forEach(source => {
      source.Data.forEach(entry => {
        if (entry.Phone) processed.phones.add(entry.Phone);
        if (entry.Email) processed.emails.add(entry.Email);
        if (entry.FullName) processed.fullNames.add(entry.FullName);
        if (entry.FirstName && entry.LastName) {
          processed.fullNames.add(`${entry.FirstName} ${entry.LastName}`);
        }
        if (entry.Address) {
          const fullAddress = `${entry.Address}, ${entry.Region}, ${entry.State} ${entry.PostCode}`;
          processed.addresses.add(fullAddress);
        }
        if (entry.Site) processed.websites.add(entry.Site);
      });
    });

    return {
      phones: Array.from(processed.phones),
      emails: Array.from(processed.emails),
      fullNames: Array.from(processed.fullNames),
      addresses: Array.from(processed.addresses),
      websites: Array.from(processed.websites)
    };
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Render a section with potential dropdown
  const renderSection = (title, iconSvg, items, sectionKey) => {
    const hasMultipleItems = items && items.length > 1;
    const isExpanded = expandedSections[sectionKey];

    return (
      <>
        <h3 className="text-gray-300 text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          {title}
        </h3>
        <div className="flex items-center gap-4 bg-gray-900 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-gray-300 flex items-center justify-center rounded-md bg-gray-800 shrink-0 size-12">
              {iconSvg}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-300 text-base font-medium leading-normal line-clamp-1">
                {`Verified ${title.toLowerCase()}`}
              </p>
              <p className="text-gray-500 text-sm font-normal leading-normal line-clamp-2">
                {items && items[0]}
              </p>
              {hasMultipleItems && isExpanded && (
                <div className="mt-2">
                  {items.slice(1).map((item, index) => (
                    <p key={index} className="text-gray-500 text-sm font-normal leading-normal mt-1">
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          {hasMultipleItems && (
            <div className="shrink-0" onClick={() => toggleSection(sectionKey)}>
              <div className="text-gray-300 flex size-7 items-center justify-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s'
                  }}
                >
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">{error}</div>;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-900 dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar/>
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5 mt-14">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-gray-300 tracking-light text-3xl font-bold leading-tight">
                  User profile report
                </p>
                <p className="text-gray-500 text-sm font-normal leading-normal">
                  This user profile report provides detailed information about a specific user.
                </p>
              </div>
            </div>
            
            {profileData && (
              <>
                {renderSection("Phone numbers", 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z" />
                  </svg>,
                  profileData.phones,
                  "phones"
                )}

                {renderSection("Full names",
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                  </svg>,
                  profileData.fullNames,
                  "names"
                )}

                {renderSection("Addresses",
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8.15,8.15,0,0,0,160,224a8,8,0,0,0,1.94-.24l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69ZM104,52.94l48,24V203.06l-48-24ZM40,62.25l48-12v127.5l-48,12Zm176,131.5-48,12V78.25l48-12Z" />
                  </svg>,
                  profileData.addresses,
                  "addresses"
                )}

                {renderSection("Email",
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
                  </svg>,
                  profileData.emails,
                  "emails"
                )}

                {renderSection("Websites",
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z" />
                  </svg>,
                  profileData.websites,
                  "websites"
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneEmail;