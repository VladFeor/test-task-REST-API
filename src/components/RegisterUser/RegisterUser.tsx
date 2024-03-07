import React, { useEffect, useState } from 'react'
import { Element } from 'react-scroll';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import doneImage from '../../img/success-image.png'

interface PositionsResponse {
    success: boolean;
    positions: { id: number; name: string }[];
}

type UserData = {
    name: string;
    email: string;
    phone: string;
    position: { id: number; value: string };
    photo?: File | undefined;
};

type FormErrors = {
    name: boolean;
    email: boolean;
    phone: boolean;
    photo: { isValid: boolean; errorMessage?: string };
};

const RegisterUser = ({ changeAccount, fetchDataUsers, account }) => {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        phone: '',
        position: { id: 1, value: 'Frontend developer' },
    });
    const [token, setToken] = useState('');
    const [positionOptions, setPositionOptions] = useState<{ label: string; value: string; id: number }[]>()

    const [isSuccessRegistration, setIsSuccessRegistration] = useState(false)

    const [formErrors, setFormErrors] = useState<FormErrors>({
        name: true,
        email: true,
        phone: true,
        photo: { isValid: true },
    });

    const setPhotoError = (errorMessage?: string) => {
        setFormErrors({ ...formErrors, photo: { isValid: false, errorMessage } });
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) {
            toast.error('Please select a photo file.');
            setPhotoError();
            return;
        }

        if (!selectedFile.type.includes('image/jpeg') && !selectedFile.type.includes('image/jpg')) {
            toast.error('The photo must be in JPEG or JPG format.');
            setPhotoError('The photo must be in JPEG or JPG format.');
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(selectedFile);
        img.onload = () => {
            if (img.width < 70 || img.height < 70) {
                toast.error('The photo dimensions should be at least 70x70 pixels.');
                setPhotoError('The photo dimensions should be at least 70x70 pixels.');
            } else if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error('The photo size should be less than 5 MB.');
                setPhotoError('The photo size should be less than 5 MB.');
            } else {
                setUserData({ ...userData, photo: selectedFile });
                setFormErrors({ ...formErrors, photo: { isValid: true } });
            }
        };
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'position') {
            setUserData({ ...userData, position: { id: parseInt(value), value } });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };
    const validateForm = () => {
        const namePattern = /^.{2,60}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\+?380[\d-]{9}$/;

        const newFormErrors: FormErrors = {
            name: namePattern.test(userData.name),
            email: emailPattern.test(userData.email),
            phone: phonePattern.test(userData.phone),
            photo: { isValid: !!userData.photo },
        };

        setFormErrors(newFormErrors);

        return !Object.values(newFormErrors).includes(false);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateForm()
        if (!validateForm()) {
            return;
        }

        if (!userData.name || !userData.email || !userData.phone || !userData.photo || !userData.position) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const formValue = {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                position_id: userData.position.id,
                photo: userData.photo,
            };

            await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formValue, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Token': token,
                },
            });
            changeAccount(userData.name)
            fetchDataUsers()
            toast.success('User successfully created');
            setIsSuccessRegistration(true)
        } catch (error) {
            console.log(error);
        }
    };
    const fetchToken = async () => {
        try {
            const response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token');
            const token = response.data.token;
            setToken(token);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get<PositionsResponse>('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
            const positionOptions = response.data.positions.map(position => ({
                label: position.name,
                value: position.name,
                id: position.id
            }));
            setPositionOptions(positionOptions)
        } catch (error) {
            console.error('Помилка отримання даних:', error);
        }
    };
    useEffect(() => {
        fetchToken()
        fetchData();
    }, []);
    useEffect(() => {
        if (!account) {
            setIsSuccessRegistration(false)
        }
    }, [account]);
    return (
        <Element name='register'>
            <div className="container">
                {!isSuccessRegistration ? (
                    <div className="register__content">
                        <div className="main__title">Working with GET request</div>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className="link">
                                <input
                                    className={formErrors.name ? "link" : "link error"}
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                />
                                <label>Your name</label>
                                {!formErrors.name && <div className="error-text">The name must contain from 2 to 60 characters.</div>}
                            </div>
                            <div className="link">
                                <input
                                    className={formErrors.email ? "link" : "link error"}
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                />
                                <label>Email</label>
                                {!formErrors.email && <div className="error-text">Please enter a valid email address.</div>}
                            </div>
                            <div className="link">
                                <input
                                    className={formErrors.phone ? "link" : "link error"}
                                    type="tel"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                />
                                <label>Phone</label>
                                <div className="lable" style={formErrors.phone ? undefined : { color: 'rgba(203, 61, 64, 1)' }}>+38 (XXX) XXX - XX - XX</div>
                            </div>
                            <div className='element__form'>Select your position:</div>
                            {positionOptions &&
                                <RadioList
                                    label="Виберіть вашу посаду"
                                    options={positionOptions}
                                    value={userData.position}
                                    onChange={(value) => setUserData({ ...userData, position: value })}
                                />
                            }

                            <div className={formErrors.photo.isValid ? "file-input" : "file-input error"}>
                                <div className={formErrors.photo.isValid ? "subfile" : " subfile error"}><span>Upload</span></div>
                                <div className="textfile">{userData.photo ? userData.photo.name : 'Upload your photo'}</div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button
                                className={(userData.phone && userData.photo && userData.name && userData.email) ? 'btn center' : 'btn gray-btn center'}
                                type="submit"
                            >
                                Sign up
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="register__content">
                        <div className="main__title">User successfully registered</div>
                        <img src={doneImage} alt="error" />
                    </div>
                )}
            </div>
        </Element>
    )
}
const RadioList = ({ label, options, value, onChange }) => {
    return (
        <div className="radio-group">
            {options.map((option) => (
                <div key={option.value}>
                    <input
                        type="radio"
                        id={option.value}
                        name={label}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
        </div>
    );
};


export default RegisterUser