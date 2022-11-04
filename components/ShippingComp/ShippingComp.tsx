import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../store';
import { OptionTypes } from './ShippingComp.types';
import { getDistricts, getDivisions } from './utils';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const ShippingComp: React.FC = () => {
    const router = useRouter();

    // @ts-ignore
    const { state, dispatch } = useContext(Store)
    const [defaultFormValue, setDefaultFormValue] = useState({
        name: state?.cart?.shippingAddress?.name,
        country_of_residence: state?.cart?.shippingAddress?.country_of_residence,
        division: state?.cart?.shippingAddress?.division,
        district: state?.cart?.shippingAddress?.district,
        prefix: state?.cart?.shippingAddress?.prefix || '880',
        phone: state?.cart?.shippingAddress?.phone,
        street: state?.cart?.shippingAddress?.street,
        post_code: state?.cart?.shippingAddress?.post_code
    })
    const [divisions, setDivisions] = useState<OptionTypes[]>([])
    const [districts, setDistricts] = useState([])

    const [form] = Form.useForm();

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 80 }}>
                <Option value="880">+880</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = async (values: any) => {
        await dispatch({
            type: 'SAVE_SHIPPING_ADDRESS', payload: {
                name: values.name,
                country_of_residence: values.country_of_residence,
                division: values.division,
                district: values.district,
                prefix: values.prefix,
                phone: values.phone,
                street: values.street,
                post_code: values.post_code
            }
        })
        await router.push('/payment-method')
    };

    const onChange = (changed: any, values: any) => {
        if (changed?.country_of_residence) {
            getDivisions().then((dta: any) => {
                setDivisions(dta?.data?.map((d: any) => {
                    return {
                        label: d?.division,
                        value: d?._id
                    }
                }))
            })
        }

        if (changed?.division) {
            getDistricts(changed?.division).then((dta: any) => {
                setDistricts(dta?.data?.map((d: any) => {
                    return {
                        label: d?.district,
                        value: d?._id
                    }
                }))
            })
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/sign-in')
        }
    }, [])

    useEffect(() => {
        setDefaultFormValue({
            name: state?.cart?.shippingAddress?.name,
            country_of_residence: state?.cart?.shippingAddress?.country_of_residence,
            division: state?.cart?.shippingAddress?.division,
            district: state?.cart?.shippingAddress?.district,
            prefix: state?.cart?.shippingAddress?.prefix || '880',
            phone: state?.cart?.shippingAddress?.phone,
            street: state?.cart?.shippingAddress?.street,
            post_code: state?.cart?.shippingAddress?.post_code
        })
    }, [state?.cart?.shippingAddress])

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="shipping"
            onFinish={onFinish}
            onValuesChange={onChange}
            initialValues={defaultFormValue}
            scrollToFirstError
            className='login_register_form'
            style={{ maxWidth: '500px' }}
        >
            <h1 className='text-center'>Fill up your shipping address:</h1>

            <Form.Item
                name="name"
                label="Full Name"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: 'Please input your full name!', whitespace: true }]}
            >
                <Input placeholder="Full Name" />
            </Form.Item>

            <Form.Item
                name="country_of_residence"
                label="Country of Residence"
                rules={[
                    { required: true, message: 'Please select your country!' },
                ]}
            >
                <Select placeholder="Country of Residence">
                    <Option value="bangladesh">Bangladesh</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="division"
                label="Division"
                rules={[
                    { required: true, message: 'Please select your division!' },
                ]}
            >
                <Select
                    placeholder="Division"
                    disabled={divisions?.length < 1}
                    showSearch
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {divisions?.map((d: any) => (
                        <Option key={d?.value} value={d?.value}>{d?.label || ''}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="district"
                label="District"
                rules={[
                    { required: true, message: 'Please select your district!' },
                ]}
            >
                <Select
                    placeholder="District"
                    disabled={districts?.length < 1}
                    showSearch
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {districts?.map((d: any) => (
                        <Option key={d?.value} value={d?.value}>{d?.label || ''}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="street"
                label="Street"
                rules={[{ required: true, message: 'Please input your street address', whitespace: true }]}
            >
                <Input placeholder="Street" />
            </Form.Item>

            <Form.Item
                name="post_code"
                label="Post Code"
                rules={[{ required: true, message: 'Please input your post code', whitespace: true }]}
            >
                <Input type='number' placeholder="Post Code" />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Proceed to payment
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ShippingComp;