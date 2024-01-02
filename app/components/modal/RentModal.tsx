"use client";

import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading";
import useRentModal from "../hooks/useRentModal";
import CategoryInput from "../input/CategoryInput";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const rentModal = useRentModal();

	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch('category')

	console.log(category)
    const setCustomValue = (id:string, value:any) => {
        setValue(id,value,{
					shouldValidate: true,
					shouldDirty: true,
					shouldTouch: true
        })
    }
	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Submit";
		}
		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}
		return "Back";
	}, [step]);

	let bodyContent = (
		<div>
			<Heading
				title="Which of these best describes your place?"
				subtitle="Pick a category"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							onClick={(category) => {
								setCustomValue("category", category);
							}}
							label={item.label}
							selected={category === item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	);
	return (
		<div>
			<Modal
				isOpen={rentModal.isOpen}
				onClose={rentModal.onClose}
				onSubmit={rentModal.onClose}
				actionLabel={actionLabel}
				secondaryActionLabel={secondaryActionLabel}
				secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
				title="Trip-Solution your home"
				body={bodyContent}
			/>
		</div>
	);
};

export default RentModal;
