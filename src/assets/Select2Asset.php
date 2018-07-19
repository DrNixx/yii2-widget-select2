<?php
namespace onix\assets;

class Select2Asset extends AssetBundle
{

    /**
     * @inheritdoc
     */
    public $depends = [
        SelectVendor2Asset::class,
    ];

    public function init()
    {
        $this->setSourcePath(dirname(dirname(__DIR__)) . '/assets');
        $this->setupAssets('css', ['css/select2.add']);
        $this->setupAssets('js', ['js/select2.add']);

        parent::init();
    }
}
