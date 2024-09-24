import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/counterSlice'
import Button from '../Button';
import Sidebar from '../Sidebar';

function Counter() {
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch()

    return (
        <div class='flex items-center justify-center mt-5'>
            <div class="card bg-primary-content w-96 shadow-xl">
                <div class="card-body items-center text-center ">
                    <h2 class="card-title">{count}</h2>
                    <p>Counter using Redux</p>
                    <div class="card-actions justify-end">
                        <Button classProp="btn btn-primary"  content='Increment' click={() => dispatch(increment())} />
                        <Button classProp="btn btn-secondary" content ='Decrement' click={() => dispatch(decrement())}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Counter
