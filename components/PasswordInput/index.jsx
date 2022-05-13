import React from 'react'

export const PasswordInput = ({ inputChange, error }) => {
  return (
    <div className='w-full'>
      <div className='flex gap-2 p-2 rounded-xl border-2 border-gray-400 h-12'>
        <div className='password-icon'>
          <svg
            width='26'
            height='26'
            viewBox='0 0 14 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.1 7.99996C1.7134 7.99996 1.4 8.32557 1.4 8.72723V13.8181C1.4 14.2198 1.7134 14.5454 2.1 14.5454H11.9C12.2866 14.5454 12.6 14.2198 12.6 13.8181V8.72723C12.6 8.32557 12.2866 7.99996 11.9 7.99996H2.1ZM0 8.72723C0 7.52224 0.940202 6.54541 2.1 6.54541H11.9C13.0598 6.54541 14 7.52224 14 8.72723V13.8181C14 15.0231 13.0598 16 11.9 16H2.1C0.940202 16 0 15.0231 0 13.8181V8.72723Z'
              fill='white'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.1 7.99996C1.7134 7.99996 1.4 8.32557 1.4 8.72723V13.8181C1.4 14.2198 1.7134 14.5454 2.1 14.5454H11.9C12.2866 14.5454 12.6 14.2198 12.6 13.8181V8.72723C12.6 8.32557 12.2866 7.99996 11.9 7.99996H2.1ZM0 8.72723C0 7.52224 0.940202 6.54541 2.1 6.54541H11.9C13.0598 6.54541 14 7.52224 14 8.72723V13.8181C14 15.0231 13.0598 16 11.9 16H2.1C0.940202 16 0 15.0231 0 13.8181V8.72723Z'
              fill='#4E5D78'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7.00078 1.45455C6.25818 1.45455 5.54598 1.76104 5.02088 2.3066C4.49578 2.85216 4.20078 3.5921 4.20078 4.36364V7.27273C4.20078 7.67439 3.88738 8 3.50078 8C3.11418 8 2.80078 7.67439 2.80078 7.27273V4.36364C2.80078 3.20633 3.24328 2.09642 4.03093 1.27808C4.81859 0.459739 5.88687 0 7.00078 0C8.11469 0 9.18298 0.459739 9.97063 1.27808C10.7583 2.09642 11.2008 3.20633 11.2008 4.36364V7.27273C11.2008 7.67439 10.8874 8 10.5008 8C10.1142 8 9.80078 7.67439 9.80078 7.27273V4.36364C9.80078 3.5921 9.50578 2.85216 8.98068 2.3066C8.45558 1.76104 7.74339 1.45455 7.00078 1.45455Z'
              fill='white'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7.00078 1.45455C6.25818 1.45455 5.54598 1.76104 5.02088 2.3066C4.49578 2.85216 4.20078 3.5921 4.20078 4.36364V7.27273C4.20078 7.67439 3.88738 8 3.50078 8C3.11418 8 2.80078 7.67439 2.80078 7.27273V4.36364C2.80078 3.20633 3.24328 2.09642 4.03093 1.27808C4.81859 0.459739 5.88687 0 7.00078 0C8.11469 0 9.18298 0.459739 9.97063 1.27808C10.7583 2.09642 11.2008 3.20633 11.2008 4.36364V7.27273C11.2008 7.67439 10.8874 8 10.5008 8C10.1142 8 9.80078 7.67439 9.80078 7.27273V4.36364C9.80078 3.5921 9.50578 2.85216 8.98068 2.3066C8.45558 1.76104 7.74339 1.45455 7.00078 1.45455Z'
              fill='#4E5D78'
            />
          </svg>
        </div>

        <input
          className='outline-none pl-2'
          type='password'
          placeholder='Your password'
          required
          onChange={inputChange}
        />
      </div>
      <p
        style={{
          color: '#FF5630',
          display: error ? 'block' : 'none'
        }}
      >
        Please enter a valid password
      </p>
    </div>
  )
}
