/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import api from 'src/api';

import styles from 'src/scss/common_modules/form_utils.module.scss';

const { eye_button, input_reset } = styles;

const Eye = () => <i className="fa-solid fa-eye-slash has-text-md-ref-primary-30" />;
const EyeSlash = () => <i className="fa-solid fa-eye has-text-md-ref-primary-30" />;

const Form = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: yup.object({
            email: yup.string().email().required('required'),
            password: yup
                .string(8)
                .test('len', 'Password must be at least 8 characters long', val => val && val.length >= 8)
                .required('required'),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required('confirm your password'),
        }),
        onSubmit: async values => {
            setLoading(true);
            const { email, password } = values;

            try {
                const res = await api.post.signup({ email, password });
                if (res.data.success) {
                    window.location.href = `/checkemail?email=${email}`;
                } else {
                    throw new Error(res.data.message);
                }
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        },
    });

    const changePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <section id="sign_up_title mb-6">
                <h1 className="title is-4 has-text-hblue has-text-centered">Ready to get started ?</h1>
                <p className="has-text-centered">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.{' '}
                </p>
            </section>
            <br />
            <section id="sign_up_form">
                <form onSubmit={formik.handleSubmit}>
                    <div className="field">
                        <label className="label is-size-7">Email</label>
                        <div className="control has-icons-left">
                            <input
                                className={`input ${formik.errors.email && formik.touched.email ? 'is-danger' : ''}`}
                                type="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="email"
                            />

                            <span className="icon is-small is-left">
                                <i className="fas fa-at" />
                            </span>

                            <p className="help is-danger">
                                {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                            </p>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label is-size-7">Password</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className={`input ${
                                    formik.touched.password && formik.errors.password ? 'is-danger' : ''
                                } ${input_reset}`}
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="password"
                            />

                            <span className="icon is-small is-left">
                                <i className="fa-solid fa-lock" />
                            </span>

                            {formik.touched.password && formik.errors.password ? (
                                <p className="help is-danger">{formik.errors.password}</p>
                            ) : null}

                            <button
                                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                                className={`unstyled-button ${eye_button}`}
                                type="button"
                                onClick={changePasswordVisibility}
                                style={{ zIndex: '5' }}
                                tabIndex="-1"
                            >
                                <span className="icon is-small">{passwordVisible ? <EyeSlash /> : <Eye />}</span>
                            </button>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label is-size-7">Confirm password</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className={`input ${
                                    formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-danger' : ''
                                } ${input_reset}`}
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Confirm password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="confirmPassword"
                            />

                            <span className="icon is-small is-left">
                                <i className="fa-solid fa-lock" />
                            </span>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <p className="help is-danger">{formik.errors.confirmPassword}</p>
                            ) : (
                                '⠀'
                            )}

                            <button
                                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                                className={`unstyled-button ${eye_button}`}
                                type="button"
                                onClick={changePasswordVisibility}
                                style={{ zIndex: '5' }}
                                tabIndex="-1"
                            >
                                <span className="icon is-small">{passwordVisible ? <EyeSlash /> : <Eye />}</span>
                            </button>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button
                                aria-label="Sign up"
                                className={`button is-hblue is-fullwidth ${loading ? 'is-loading' : ''}`}
                                type="submit"
                                disabled={Object.keys(formik.errors).length > 0}
                            >
                                Sign up
                            </button>
                        </div>
                        <br />
                        <div className="has-text-centered">
                            Already have an account?{' '}
                            <Link href="/login" passHref>
                                <a href="replace">
                                    <u>Log in</u>
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Form;
