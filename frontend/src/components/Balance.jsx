export const Balance = ({ value }) => {
    return <div className="flex items-baseline">
        <div className="text-xl font-bold">
            Your Balance:
        </div>
        <div className="mx-2 text-lg font-semibold">
            Rs {value}
        </div>
    </div>
}