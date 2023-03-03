import { questionsAmount } from "./fetcher"
import { useQuery } from "@tanstack/react-query"

export const useQuestionsAmount = ({ amount }) => {

    return useQuery({
        queryKey: ['questions-amount', amount],
        queryFn: () => questionsAmount(amount),
        refetchOnWindowFocus: false, // default: true
    })
}

/*
    //Opsi Source Code NATIVE

    import { useEffect, useState } from "react"
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        setIsLoading(true)
        questionsAmount(10).then(data => {
                setIsLoading(false)
                setData(data)
            })
            .catch(error => {
                setIsLoading(false)
                setError(error)
            })
    }, [])

    return {
        data,
        isLoading,
        error
    }
*/