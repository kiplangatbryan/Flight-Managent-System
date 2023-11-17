import { describe } from 'jest';
import { mount } from '@vue/test-utils';
import flight from '@/components/flight';


describe( 'flight', () => {
    const flightWrapper = mount( flight );
    expect( flightWrapper.props ).toBe();
} );