import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, Space, DatePicker, Button } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

import { markedValues } from '../model/const';
import { mainTableFilterSelector } from 'store/filters/filtersSelectors';
import {
  MarkedType,
  resetMainTableFilter,
  setMainTableFilter,
} from 'store/filters/filtersSlice';

type EventValue<DateType> = DateType | null;
type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;

const { RangePicker } = DatePicker;

export const FilterContent = () => {
  const dispatch = useDispatch();
  const {
    name: nameDefault,
    marked: markedDefault,
    dateRange: dateRangeDefault,
    dealer: dealerDefault,
  } = useSelector(mainTableFilterSelector);

  const [name, setName] = useState(nameDefault);
  const [marked, setMarked] = useState(markedDefault);
  const [dateRange, setDate] = useState<
    Record<string, string | undefined> | undefined
  >(dateRangeDefault);
  const [dealer, setDealer] = useState(dealerDefault);

  const initialValues = {
    name: nameDefault.value,
    marked: markedDefault.value,
    date: [
      dateRangeDefault.dateFrom ? dayjs(dateRangeDefault.dateFrom) : null,
      dateRangeDefault.dateTo ? dayjs(dateRangeDefault.dateTo) : null,
    ],
    dealer: dealerDefault.value,
  };

  const handleReset = () => {
    dispatch(resetMainTableFilter());
  };

  const handleSubmit = () => {
    dispatch(setMainTableFilter({ name, marked, dateRange, dealer }));
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName({ value: event.target.value });
  };

  const onMarkedChange = (val: MarkedType) => {
    setMarked({ value: val });
  };

  const onDateRangeChange = (_: RangeValue<Dayjs>, dateStrings: string[]) => {
    setDate({
      dateFrom: dateStrings.at(0),
      dateTo: dateStrings.at(1),
    });
  };

  const onDealerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDealer({ value: event.target.value });
  };

  return (
    <Form layout="vertical" initialValues={initialValues}>
      <Row>
        <Space wrap>
          <Col>
            <Form.Item label="Название" name="name">
              <Input
                placeholder="Название содержит"
                prefix={<SearchOutlined />}
                onChange={onNameChange}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Статус разметки" name="marked">
              <Select
                style={{ width: 140 }}
                options={markedValues}
                onChange={onMarkedChange}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Статус разметки" name="date">
              <RangePicker locale={locale} onChange={onDateRangeChange} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Дилер" name="dealer">
              <Input
                placeholder="Название дилера"
                prefix={<SearchOutlined />}
                onChange={onDealerChange}
              />
            </Form.Item>
          </Col>
        </Space>
      </Row>
      <Space>
        <Button type="primary" onClick={handleSubmit}>
          Применить
        </Button>
        <Button type="default" onClick={handleReset}>
          Сбросить фильтр
        </Button>
      </Space>
    </Form>
  );
};
