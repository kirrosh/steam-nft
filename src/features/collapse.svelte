<script>
	export let expanded = false;
</script>

<div>
	<slot name="header" onToggle={() => (expanded = !expanded)} />
</div>
<div>
	<div hidden={!expanded}>
		<slot name="content" />
	</div>
</div>
